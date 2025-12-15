# Manual Supabase Migrations

To apply these database migrations manually, please follow these steps:

1. **Navigate to the Supabase SQL Editor:**
    Open the SQL Editor for your project by clicking [here](https://supabase.com/dashboard/project/ggyzlvbtkibqnkfhgnbe/sql).

2. **Create a New Query:**
    Click on the "+ New query" button in the SQL Editor.

3. **Copy Migration SQL:**
    Open the latest migration file in this directory (the one with the most recent timestamp in the filename) and copy its entire contents.

    For example, open `20251101001710_add_call_records_and_user_preferences.sql` and copy the SQL code.

4. **Paste and Run:**
    Paste the copied SQL into the new query editor in Supabase and click the "RUN" button.

5. **Verify:**
    You should see a "Success. No rows returned" message. You can also verify that the new tables (`call_records` and `user_preferences`) have been created by looking at the table list on the left side of the screen.

6. **Repeat (if necessary):**
    If there are other new migration files that haven't been applied, repeat steps 2-5 for each file in chronological order (oldest to newest).
