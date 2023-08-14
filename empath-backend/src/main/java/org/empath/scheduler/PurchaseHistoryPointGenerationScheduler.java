package org.empath.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.empath.service.PurchaseHistoryPointGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Configuration
@EnableScheduling
public class PurchaseHistoryPointGenerationScheduler {

    @Autowired
    PurchaseHistoryPointGenerationService purchaseHistoryPointGenerationService;

    @Scheduled(cron = "0 0 * * * *")
    public void scheduleFixedDelayTask() {
        try {
            log.info("PurchaseHistoryPointGenerationScheduler started at {}",LocalDateTime.now(ZoneId.of("UTC")).withSecond(0).withNano(0));
            purchaseHistoryPointGenerationService.process();
        } catch(Exception e){
            log.error("PurchaseHistoryPointGenerationScheduler Job failed at {}, fix and run manually",  LocalDateTime.now(ZoneId.of("UTC")).withSecond(0).withNano(0));
        }
    }
}
