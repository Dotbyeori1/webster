package com.seinfo.webster.config;

import me.desair.tus.server.TusFileUploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${tus.server.data.directory}")
	private String tusStoragePath;
	
	@Value("${tus.server.data.expiration}")
	private Long tusExpirationPeriod;
	
	@Value("${server.servlet.context-path}")
	private String contextPath;

	@Bean
	@Primary
	public TusFileUploadService tus() {
		if("/".equals(contextPath)) {
			contextPath = "";
		}
		return new TusFileUploadService().withStoragePath(tusStoragePath).withDownloadFeature()
				.withUploadExpirationPeriod(tusExpirationPeriod).withThreadLocalCache(true)
				.withUploadUri(contextPath + "/upload");
	}

}
