package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.model.db.Messaging;
import org.empath.model.dto.Response;
import org.empath.service.MessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_FAILURE;
import static org.empath.constant.CommonConstants.REST_SUCCESS;

@CrossOrigin
@RequestMapping("/v1/messaging")
@RestController
public class MessagingController {

    @Autowired
    MessagingService messagingService;

    @GetMapping("/getAllMessages")
    public ResponseEntity<Response> getAllMessages(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, messagingService.getAllMessages()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getMessagesByClientId/{id}")
    public ResponseEntity<Response> getMessagesByClientId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, messagingService.getMessagesByClientId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getMessagesByUserId/{id}")
    public ResponseEntity<Response> getMessagesByUserId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, messagingService.getMessagesByUserId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addMessage")
    public ResponseEntity<Response> addMessage(@RequestBody Messaging messaging){
        try {
            messagingService.addMessage(messaging);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/deleteMessageByMessageId/{id}")
    public ResponseEntity<Response> deleteMessageByMessageId(@PathVariable("id") String id){
        try {
            messagingService.deleteMessageByMessageId(id);
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
