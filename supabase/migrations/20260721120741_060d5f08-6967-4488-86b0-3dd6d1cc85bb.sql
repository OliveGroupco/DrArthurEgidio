
-- Enum for roles
create type public.app_role as enum ('admin', 'patient');

-- Enum for appointment status
create type public.appointment_status as enum ('pending', 'confirmed', 'rescheduled', 'cancelled', 'completed');

-- Enum for appointment type
create type public.appointment_type as enum ('primeira_consulta', 'retorno', 'avaliacao', 'urgencia', 'exame');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- User roles (never on profiles)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

-- Security definer role checker
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

-- Appointments
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  cpf text,
  preferred_date date not null,
  preferred_time text not null,
  appointment_type public.appointment_type not null,
  specialty text,
  notes text,
  status public.appointment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.appointments to authenticated;
grant insert on public.appointments to anon;
grant all on public.appointments to service_role;
alter table public.appointments enable row level security;

-- Treatments (public read, admin write)
create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.treatments to anon;
grant select, insert, update, delete on public.treatments to authenticated;
grant all on public.treatments to service_role;
alter table public.treatments enable row level security;

-- Policies: profiles
create policy "Users can view own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Users can insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Policies: user_roles
create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "Admins can view all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Policies: appointments
create policy "Anyone can create appointment request" on public.appointments
  for insert to anon, authenticated with check (true);
create policy "Admins can view all appointments" on public.appointments
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update appointments" on public.appointments
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete appointments" on public.appointments
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Policies: treatments
create policy "Anyone can view treatments" on public.treatments
  for select to anon, authenticated using (true);
create policy "Admins can insert treatments" on public.treatments
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update treatments" on public.treatments
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete treatments" on public.treatments
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger t_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger t_appointments_updated_at before update on public.appointments
  for each row execute function public.set_updated_at();
create trigger t_treatments_updated_at before update on public.treatments
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed treatments
insert into public.treatments (slug, title, description, icon, sort_order) values
  ('implantes', 'Implantes Dentários', 'Restauração completa de dentes perdidos com implantes de titânio de última geração.', 'Anchor', 10),
  ('ortodontia', 'Ortodontia', 'Aparelhos fixos, autoligados e alinhadores invisíveis para um sorriso alinhado.', 'AlignJustify', 20),
  ('clareamento', 'Clareamento Dental', 'Clareamento profissional a laser e caseiro supervisionado para dentes mais brancos.', 'Sun', 30),
  ('lentes', 'Lentes de Contato Dental', 'Lentes ultrafinas em porcelana para transformar seu sorriso com naturalidade.', 'Sparkles', 40),
  ('proteses', 'Próteses', 'Próteses fixas, removíveis e sobre implantes com estética e conforto.', 'Layers', 50),
  ('facetas', 'Facetas', 'Facetas em porcelana e resina para corrigir forma, cor e alinhamento.', 'Star', 60),
  ('canal', 'Tratamento de Canal', 'Endodontia moderna e indolor para preservar seu dente natural.', 'Activity', 70),
  ('extracoes', 'Extrações', 'Extrações simples e cirúrgicas com máxima segurança e conforto.', 'Scissors', 80),
  ('cirurgia', 'Cirurgia Oral', 'Cirurgias orais menores realizadas com técnica avançada.', 'Stethoscope', 90),
  ('limpeza', 'Limpeza e Prevenção', 'Profilaxia, aplicação de flúor e orientação para saúde bucal duradoura.', 'ShieldCheck', 100),
  ('odontopediatria', 'Odontopediatria', 'Atendimento especializado e humanizado para crianças.', 'Baby', 110),
  ('periodontia', 'Periodontia', 'Tratamento de gengivas, raspagem e cuidado periodontal.', 'Heart', 120),
  ('estetica', 'Dentística Estética', 'Restaurações estéticas invisíveis com resinas de alta qualidade.', 'Palette', 130),
  ('harmonizacao', 'Harmonização Orofacial', 'Procedimentos estéticos faciais para realçar sua beleza natural.', 'Flower2', 140);
