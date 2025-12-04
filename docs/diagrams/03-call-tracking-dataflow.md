# 3. Data Flow: Call Tracking Example

```mermaid
graph LR
    User["User<br/>(InterpreTrack page)"]
    User -->|triggers| StartCall["Start Call Button"]
    StartCall -->|useCallTracker.startCall()| CallTracker["useCallTracker Hook"]
    CallTracker -->|calls| CallLogService["CallLogService.createCallLog()"]
    CallLogService -->|insert| Supabase["Supabase<br/>call_logs table"]

    Timer["Timer Running<br/>(interval: 1000ms)"]
    CallTracker -->|manages| Timer
    Timer -->|updates| ElapsedSeconds["elapsedSeconds state"]

    User -->|triggers| EndCall["End Call Button"]
    EndCall -->|useCallTracker.endCall()| CalcEarnings["Calculate Earnings"]
    CalcEarnings -->|uses| UserSettings["UserSettingsService<br/>get pay_rate"]
    UserSettings -->|query| SupabaseSettings["user_settings table"]
    CalcEarnings -->|update| CallLogService
    CallLogService -->|update| Supabase

    Supabase -->|emit| Dashboard["Dashboard page<br/>displays updated stats"]
```
