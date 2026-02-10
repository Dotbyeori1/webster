package com.seinfo.webster.util.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Setter
@Getter
@Builder
public class CoreWebApiResponseModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private String http_uid;

    @NotNull
    private String http_msg;

    @NotNull
    private Date timestamp;

    @NotNull
    private String process_code;

    @NotNull
    private String process_status;

    @NotNull
    private String process_msg;

    @NotNull
    private transient Object data;

    public CoreWebApiResponseModel(@NotNull  String http_uid, @NotNull String http_msg, @NotNull Date timestamp, @NotNull String process_code, @NotNull String process_status, String process_msg, Object data) {
        this.http_uid = http_uid;
        this.http_msg = http_msg;
        this.timestamp = timestamp;
        this.process_code = process_code;
        this.process_status = process_status;
        this.process_msg = process_msg;
        this.data = data;
    }
}
