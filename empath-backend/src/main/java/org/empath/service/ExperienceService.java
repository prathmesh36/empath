package org.empath.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Experience;
import org.empath.model.db.Order;
import org.empath.model.dto.internal.ExperienceData;
import org.empath.model.dto.internal.OrderData;
import org.empath.repository.ExperienceRepository;
import org.empath.repository.OrderRepository;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ExperienceService {

    @Autowired
    ExperienceRepository experienceRepository;

    @Autowired
    OrderRepository orderRepository;

    public List<Experience> getAllExperiences() throws EmpathException {
        try {
            return experienceRepository.getAllExperiences();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<Experience> getAllUpcomingExperiences() throws EmpathException {
        try {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
            return experienceRepository.getAllUpcomingExperiences(dtf.format(now));
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<ExperienceData> getYourExperiences(String id) throws EmpathException{
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Order> orderList = orderRepository.getOrderByUserId(id);
            List<ExperienceData> expList = new ArrayList<>();
            for(Order order: orderList){
                Experience experience = experienceRepository.getExperienceByExpId(order.getExpId());
                ExperienceData experienceData = objectMapper.readValue(objectMapper.writeValueAsString(experience), ExperienceData.class);
                experienceData.setOrder(order);
                expList.add(experienceData);
            }
            return expList;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public Experience getExperienceByExpId(String expId) throws EmpathException{
        try {
            return  experienceRepository.getExperienceByExpId(expId);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public void addExperience(Experience experience) throws EmpathException {
        try{
            enrichExperience(experience);
            experienceRepository.save(experience);
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void deleteExperienceByExpId(String expId) throws EmpathException {
        try{
            if(experienceRepository.getExperienceByExpId(expId) != null) {
                experienceRepository.deleteExperienceByExpId(expId);
            }else {
                throw new EmpathException(ErrorCodes.ERROR_CODE_2.getMessage(), ErrorCodes.ERROR_CODE_2.getCode());
            }
        }catch(EmpathException e){
            throw e;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    private void enrichExperience(Experience experience){
        experience.setExpId(CommonUtil.getUUID());
    }

    public void increaseOrDeductExperienceQuantityByUserId(String expId, int qty){
        experienceRepository.increaseOrDeductExperienceQuantityByUserId(expId, qty);
    }

}
