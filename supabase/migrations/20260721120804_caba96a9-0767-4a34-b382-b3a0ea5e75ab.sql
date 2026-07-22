
-- Lock down SECURITY DEFINER function execution
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Replace permissive appointment insert policy with explicit checks
drop policy if exists "Anyone can create appointment request" on public.appointments;
create policy "Anyone can create appointment request" on public.appointments
  for insert to anon, authenticated
  with check (
    length(trim(full_name)) between 2 and 120
    and length(trim(phone)) between 8 and 30
    and length(trim(email)) between 5 and 160
    and email like '%_@_%.__%'
    and preferred_date >= current_date
    and length(coalesce(notes, '')) <= 1000
  );
