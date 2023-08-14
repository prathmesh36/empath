package org.empath.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.empath.service.SMInteractionPointGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Configuration
@EnableScheduling
public class SMInteractionPointGenerationScheduler {

    @Autowired
    SMInteractionPointGenerationService smInteractionPointGenerationService;

    @Scheduled(cron = "0 0 * * * *")
    public void scheduleFixedDelayTask() {
        try {
            log.info("SMInteractionPointGenerationScheduler started at {}",LocalDateTime.now(ZoneId.of("UTC")).withSecond(0).withNano(0));
            smInteractionPointGenerationService.process();
        } catch(Exception e){
            log.error("SMInteractionPointGenerationScheduler Job failed at {}, fix and run manually",  LocalDateTime.now(ZoneId.of("UTC")).withSecond(0).withNano(0));
        }
    }
}
