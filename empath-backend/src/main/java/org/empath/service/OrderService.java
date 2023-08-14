package org.empath.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.empath.constant.ErrorCodes;
import org.empath.exception.EmpathException;
import org.empath.model.db.Experience;
import org.empath.model.db.Order;
import org.empath.model.dto.internal.OrderData;
import org.empath.repository.OrderRepository;
import org.empath.repository.projection.UserProjection;
import org.empath.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Iterator;
import java.util.List;

@Slf4j
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserService userService;

    @Autowired
    ExperienceService experienceService;

    public List<Order> getAllOrders() throws EmpathException {
        try {
            return orderRepository.getAllOrders();
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public OrderData getOrderByOrderId(String orderId) throws EmpathException{
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Order order = orderRepository.getOrderByOrderId(orderId);
            OrderData orderData = objectMapper.readValue(objectMapper.writeValueAsString(order), OrderData.class);
            orderData.setExpName(experienceService.getExperienceByExpId(order.getExpId()).getExpName());
            return orderData;
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    public List<OrderData> getOrderByUserId(String userId) throws EmpathException{
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Order> orders = orderRepository.getOrderByUserId(userId);
            return getOrderData(objectMapper, orders);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    private List<OrderData> getOrderData(ObjectMapper objectMapper, List<Order> orders) throws com.fasterxml.jackson.core.JsonProcessingException, EmpathException {
        List<OrderData> orderData = objectMapper.readValue(objectMapper.writeValueAsString(orders), new TypeReference<List<OrderData>>() {});
        Iterator<Order> orderIt = orders.iterator();
        Iterator<OrderData> orderDataIt = orderData.iterator();
        while(orderIt.hasNext() && orderDataIt.hasNext()){
            orderDataIt.next().setExpName(experienceService.getExperienceByExpId(orderIt.next().getExpId()).getExpName());
        }
        return orderData;
    }

    public List<OrderData> getOrderByExpId(String expId) throws EmpathException{
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Order> orders = orderRepository.getOrderByExpId(expId);
            return getOrderData(objectMapper, orders);
        } catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public String addOrder(Order order) throws EmpathException {
        try{
            enrichOrder(order);
            validateOrder(order);
            experienceService.increaseOrDeductExperienceQuantityByUserId(order.getExpId(), -order.totalQuantity);
            userService.increaseOrDeductPointsByUserId(order.getUserId(), -order.totalCost);
            orderRepository.addOrder(order.getOrderId(), order.getExpId(), order.getUserId(), order.getTotalCost(), order.getTotalQuantity(), order.getOrderAddress());
            return order.getOrderId();
        }catch(EmpathException e){
            throw e;
        }catch(Exception e){
            log.error("An error occurred: {}", e.getMessage(), e);
            throw new EmpathException(ErrorCodes.ERROR_CODE_1.getMessage(), ErrorCodes.ERROR_CODE_1.getCode());
        }
    }

    @Transactional
    public void deleteOrderByOrderId(String orderId) throws EmpathException {
        try{
            Order order = orderRepository.getOrderByOrderId(orderId);
            if(order != null) {
                experienceService.increaseOrDeductExperienceQuantityByUserId(order.getExpId(), order.totalQuantity);
                userService.increaseOrDeductPointsByUserId(order.getUserId(), order.totalCost);
                orderRepository.deleteOrderByOrderId(orderId);
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

    private void enrichOrder(Order order) throws EmpathException {
        order.setOrderId(CommonUtil.getUUID());
        order.setTotalCost(experienceService.getExperienceByExpId(order.getExpId()).getExpCost()*order.getTotalQuantity());
    }

    private void validateOrder(Order order) throws EmpathException {
        Experience experience = experienceService.getExperienceByExpId(order.getExpId());
        if(experience.getExpQuantity() - order.getTotalQuantity() < 0){
            log.error("An error occurred because of insufficient inventory");
            throw new EmpathException(ErrorCodes.ERROR_CODE_6.getMessage(), ErrorCodes.ERROR_CODE_6.getCode());
        }
        UserProjection user = userService.getUserByUserId(order.getUserId());
        if(user.getUserPoints() - order.totalCost < 0){
            log.error("An error occurred because of insufficient inventory");
            throw new EmpathException(ErrorCodes.ERROR_CODE_7.getMessage(), ErrorCodes.ERROR_CODE_7.getCode());
        }
    }
}
