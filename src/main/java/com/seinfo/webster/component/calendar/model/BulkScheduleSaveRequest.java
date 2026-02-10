package com.seinfo.webster.component.calendar.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BulkScheduleSaveRequest {

    @NotNull private Long calendarNo;
    @NotBlank private String scheduleDate; // 기본/참고용(신규 insert 기본값 등)

    @NotNull @Builder.Default
    private List<Row> upsertList = List.of();

    @NotNull @Builder.Default
    private List<Long> deleteNos = List.of();

    private Boolean deleteCalendarIfEmpty; // 옵션

    @Getter @Setter
    public static class Row {
        private Long scheduleNo;              // 신규면 null
        @NotNull private Long calendarNo;
        @NotBlank private String scheduleSort;
        @NotBlank private String scheduleType;
        @NotBlank private String scheduleContent;
        @NotBlank private String scheduleColor;
    }
}
