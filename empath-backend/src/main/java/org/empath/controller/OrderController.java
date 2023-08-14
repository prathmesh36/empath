package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.db.Order;
import org.empath.model.dto.Response;
import org.empath.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_FAILURE;
import static org.empath.constant.CommonConstants.REST_SUCCESS;

@CrossOrigin
@RequestMapping("/v1/order")
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/getAllOrders")
    public ResponseEntity<Response> getAllOrders(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, orderService.getAllOrders()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getOrderByOrderId/{id}")
    public ResponseEntity<Response> getOrderByOrderId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, orderService.getOrderByOrderId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getOrderByUserId/{id}")
    public ResponseEntity<Response> getOrderByUserId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, orderService.getOrderByUserId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getOrderByExpId/{id}")
    public ResponseEntity<Response> getOrderByExpId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, orderService.getOrderByExpId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addOrder")
    public ResponseEntity<Response> addOrder(@RequestBody Order order){
        try {
            String orderId = orderService.addOrder(order);
            return ResponseEntity.ok(new Response(REST_SUCCESS, orderId));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/deleteOrderByOrderId/{id}")
    public ResponseEntity<Response> deleteOrderByOrderId(@PathVariable("id") String id){
        try {
            orderService.deleteOrderByOrderId(id);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        } catch(Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(REST_FAILURE, null)
            );
        }
    }
}
