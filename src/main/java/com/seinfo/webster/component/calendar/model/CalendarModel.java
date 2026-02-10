package com.seinfo.webster.component.calendar.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Generated
public class CalendarModel implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int calendarNo;
	
	@NotBlank(message = "날짜를 입력해주세요.")
	private String calendarDate;

	private String scheduleYn;
	private String scheduleTime;

    private String startDate;
    private String endDate;
}
