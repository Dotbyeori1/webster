package com.seinfo.webster.component.calendar.mapper;

import com.seinfo.webster.component.calendar.model.BulkScheduleSaveRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CalendarMapper {

    List<Map<String, Object>> selectTotalSchuleList(Map<String, Object> param);
    List<Map<String, Object>> selectCalendarList(Map<String, Object> param);
    void insertUpdateCalendar(Map<String, Object> param) throws Exception;
    int getLastInsertId();
    Map<String, Object> selectCalendar(@Param("calendarNo") String calendarNo);
    List<Map<String, Object>> selectScheduleList(@Param("calendarNo") String calendarNo);
    void insertUpdateSchedule(@Param("list")List<BulkScheduleSaveRequest.Row> list) throws Exception;
    void deleteSchedule(@Param("nos") List<Long> nos) throws Exception;
    int countByCalendarNo(@Param("calendarNo") Long calendarNo);
    void deleteCalendar(@Param("calendarNo") Long calendarNo) throws Exception;
}

