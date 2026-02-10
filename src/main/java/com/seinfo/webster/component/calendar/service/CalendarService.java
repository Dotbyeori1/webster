package com.seinfo.webster.component.calendar.service;

import com.seinfo.webster.component.calendar.model.BulkScheduleSaveRequest;
import com.seinfo.webster.component.calendar.model.CalendarModel;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CalendarService {
    ResponseEntity<?> getCalendarList(Map<String, Object> param);
    ResponseEntity<?> registerModifyCalendar(CalendarModel calendarModel) throws Exception;
    ResponseEntity<?> saveSchedulesBulk(BulkScheduleSaveRequest req) throws Exception;
    ResponseEntity<?> getScheduleDetail(String calendarNo);
}