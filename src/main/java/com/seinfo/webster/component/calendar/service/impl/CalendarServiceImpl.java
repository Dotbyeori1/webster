package com.seinfo.webster.component.calendar.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seinfo.webster.component.calendar.mapper.CalendarMapper;
import com.seinfo.webster.component.calendar.model.BulkScheduleSaveRequest;
import com.seinfo.webster.component.calendar.model.CalendarModel;
import com.seinfo.webster.component.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarServiceImpl implements CalendarService {

    private final CalendarMapper calendarMapper;

    @Override
    public ResponseEntity<?> getCalendarList(Map<String, Object> param) {
        List<Map<String, Object>> calendarList = calendarMapper.selectCalendarList(param);
        List<Map<String, Object>> scheduleList = calendarMapper.selectTotalSchuleList(param);
        Map<String, Object> rtnMap = new HashMap<>();
        rtnMap.put("calendarList", calendarList);
        rtnMap.put("scheduleList", scheduleList);
        return ResponseEntity.ok(rtnMap);
    }

    @Override
    @Transactional
    public ResponseEntity<?> registerModifyCalendar(CalendarModel calendarModel) throws Exception {
        Map<String, Object> param = new ObjectMapper().convertValue(calendarModel, Map.class);

        calendarMapper.insertUpdateCalendar(param);

        int calendarNo = calendarMapper.getLastInsertId();

        return ResponseEntity.ok(calendarNo);
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveSchedulesBulk(BulkScheduleSaveRequest req) throws Exception {

        if(!req.getUpsertList().isEmpty()){
            calendarMapper.insertUpdateSchedule(req.getUpsertList());
        }

        if (!req.getDeleteNos().isEmpty()) {
            calendarMapper.deleteSchedule(req.getDeleteNos());
        }

        if (Boolean.TRUE.equals(req.getDeleteCalendarIfEmpty())) {
            int remain = calendarMapper.countByCalendarNo(req.getCalendarNo());
            if (remain == 0) {
                calendarMapper.deleteCalendar(req.getCalendarNo());
            }
        }

        return ResponseEntity.ok(Map.of("message", "저장되었습니다."));
    }

    @Override
    public ResponseEntity<?> getScheduleDetail(String calendarNo) {
        Map<String, Object> calendarDetail = calendarMapper.selectCalendar(calendarNo);
        List<Map<String, Object>> scheduleList = calendarMapper.selectScheduleList(calendarNo);

        Map<String, Object> rtnMap = new HashMap<>();
        rtnMap.put("calendarDetail", calendarDetail);
        rtnMap.put("scheduleList", scheduleList);

        return ResponseEntity.ok(rtnMap);
    }
}
