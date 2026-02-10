package com.seinfo.webster.component.calendar.model;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Generated
public class ScheduleModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer scheduleNo;
    private String scheduleDate;
    private Integer calendarNo;
    private String scheduleSort;
    private String scheduleContent;
    private String scheduleColor;
}
