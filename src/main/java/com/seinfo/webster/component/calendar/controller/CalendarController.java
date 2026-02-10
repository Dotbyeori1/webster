package com.seinfo.webster.component.calendar.controller;

import com.seinfo.webster.component.calendar.model.BulkScheduleSaveRequest;
import com.seinfo.webster.component.calendar.model.CalendarModel;
import com.seinfo.webster.component.calendar.service.CalendarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
@Slf4j
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/getScheduleList")
    public ResponseEntity<?> getCalendar(@RequestParam(required = false) Map<String, Object> param) throws Exception{
        return calendarService.getCalendarList(param);
    }

    @GetMapping("/getSchedule")
    public ResponseEntity<?> getSchedule(@RequestParam String calendarNo) throws Exception{
        return calendarService.getScheduleDetail(calendarNo);
    }

    @PostMapping("/upsertCalendar")
    public ResponseEntity<?> insertSchedule(@RequestBody CalendarModel calendarModel) throws Exception{
        try {
            return calendarService.registerModifyCalendar(calendarModel);
        }catch (Exception e){
            log.error(e.getMessage());
            Map<String,Object> rtnMap = new HashMap<>();
            rtnMap.put("message", "저장 중 오류발생");
            return ResponseEntity.internalServerError().body(rtnMap);
        }
    }

    @PostMapping("/upsertSchedule")
    public ResponseEntity<?> bulkAction(@Valid @RequestBody BulkScheduleSaveRequest req) throws Exception{
        try {
            return calendarService.saveSchedulesBulk(req);
        }catch (Exception e){
            log.error(e.getMessage());
            Map<String,Object> rtnMap = new HashMap<>();
            rtnMap.put("message", "저장 중 오류발생");
            return ResponseEntity.internalServerError().body(rtnMap);
        }
    }
}
