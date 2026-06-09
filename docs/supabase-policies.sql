alter table profiles enable row level security;
alter table resumes enable row level security;
alter table interviews enable row level security;
alter table answers enable row level security;

create policy "Users can read own profile"
on profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update own profile"
on profiles for update
to authenticated
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can read own resumes"
on resumes for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own resumes"
on resumes for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read own interviews"
on interviews for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own interviews"
on interviews for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read own answers"
on answers for select
to authenticated
using (
  exists (
    select 1 from interviews
    where interviews.id = answers.interview_id
    and interviews.user_id = auth.uid()
  )
);

create policy "Users can insert own answers"
on answers for insert
to authenticated
with check (
  exists (
    select 1 from interviews
    where interviews.id = answers.interview_id
    and interviews.user_id = auth.uid()
  )
);
