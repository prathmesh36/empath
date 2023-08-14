package org.empath.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.dto.*;
import org.empath.model.dto.clientHistory.ClientHistoryData;
import org.empath.model.dto.instagram.CommentsDatum;
import org.empath.model.dto.instagram.InstagramCommentedUser;
import org.empath.model.dto.instagram.InstagramComments;
import org.empath.model.dto.instagram.InstagramMedias;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;

@Slf4j
public class DummyDataGeneratorUtil {

    public static List<ClientHistoryData> getClientHistoryDummyData() throws EmpathException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Resource resource = new ClassPathResource("data/clientHistory/client-history-data.json");
            File jsonFile = resource.getFile();
            Response<List<ClientHistoryData>> data = objectMapper.readValue(jsonFile, new TypeReference<Response<List<ClientHistoryData>>>() {});
            List<ClientHistoryData> clientHistoryDataList = data.getBody();
            List<Timestamp> selectedTimestamps = getTimestamps(8, 10, 9, false);

            int i=0;
            for (ClientHistoryData clientHistoryData : clientHistoryDataList) {
                clientHistoryData.setTimestamp(selectedTimestamps.get(i%3).toString());
                i++;
            }
            return clientHistoryDataList;
        } catch (IOException e) {
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
    }

    public static InstagramComments getInstagramCommentsDummyData() throws EmpathException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Resource resource = new ClassPathResource("data/instagram/instagram-comments-data.json");
            File jsonFile = resource.getFile();
            InstagramComments instagramComments = objectMapper.readValue(jsonFile, InstagramComments.class);
            List<Timestamp> selectedTimestamps = getTimestamps(20, 21, 22, true);
            int i=0;
            for (CommentsDatum commentsDatum : instagramComments.data){
                Date date = selectedTimestamps.get(i);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'+0000'");
                commentsDatum.timestamp = dateFormat.format(date);
                i++;
            }
            return instagramComments;
        } catch (IOException e) {
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
    }

    public static InstagramCommentedUser getInstagramCommentedUserDummyData() throws EmpathException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Resource resource = new ClassPathResource("data/instagram/instagram-commented-user-data.json");
            File jsonFile = resource.getFile();
            return objectMapper.readValue(jsonFile, InstagramCommentedUser.class);
        } catch (IOException e) {
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
    }

    public static InstagramMedias getInstagramMediaDummyData() throws EmpathException {
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            Resource resource = new ClassPathResource("data/instagram/instagram-media-data.json");
            File jsonFile = resource.getFile();
            return objectMapper.readValue(jsonFile, InstagramMedias.class);
        }catch(IOException e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_4.getMessage(), ErrorCodes.ERROR_CODE_4.getCode());
        }
    }

    private static List<Timestamp> getTimestamps(int hour1, int hour2, int hour3, boolean isInstagram){
        Instant currentInstant = Instant.now();
        LocalDateTime currentDateTime = LocalDateTime.ofInstant(currentInstant, ZoneOffset.UTC);
        LocalDateTime startTime;

        if(isInstagram)
            startTime = currentDateTime.minusHours(24).withMinute(0).withSecond(0).withNano(0);
        else
            startTime = currentDateTime.minusHours(23).withMinute(0).withSecond(0).withNano(0);

        LocalTime time1 = LocalTime.of(hour1, 0);
        LocalTime time2 = LocalTime.of(hour2, 0);
        LocalTime time3 = LocalTime.of(hour3, 0);

        List<Timestamp> selectedTimestamps = new ArrayList<>();

        LocalDateTime current = startTime;
        while (current.isBefore(currentDateTime)) {
            LocalTime currentTime = current.toLocalTime();
            if (currentTime.equals(time1) || currentTime.equals(time2) || currentTime.equals(time3)) {
                Timestamp timestamp = Timestamp.valueOf(current);
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(timestamp);
                calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
                timestamp.setTime(calendar.getTimeInMillis());
                selectedTimestamps.add(timestamp);
            }
            current = current.plusHours(1);
        }
        return selectedTimestamps;
    }

}
