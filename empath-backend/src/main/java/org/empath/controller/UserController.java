package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.db.User;
import org.empath.model.db.UserClientRelation;
import org.empath.model.dto.Response;
import org.empath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_FAILURE;
import static org.empath.constant.CommonConstants.REST_SUCCESS;

@RequestMapping("/v1/user")
@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<Response> getAllUsers(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, userService.getAllUsers()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getUserByUserId/{id}")
    public ResponseEntity<Response> getUserByUserId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, userService.getUserByUserId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getUserClientDataByUserId/{id}")
    public ResponseEntity<Response> getUserClientDataByUserId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, userService.getUserClientDataByUserId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<Response> addUser(@RequestBody User user){
        try {
            userService.addUser(user);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/deleteUserByUserId/{id}")
    public ResponseEntity<Response> deleteUserByUserId(@PathVariable("id") String id){
        try {
            userService.deleteUserByUserId(id);
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

    @PostMapping("/addUserClientId")
    public ResponseEntity<Response> addUserClientId(@RequestBody UserClientRelation userClientRelation){
        try {
            userService.addClientUserId(userClientRelation);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PutMapping("/updateInstagramIdByUserId/{id}")
    public ResponseEntity<Response> updateInstagramIdByUserId(@PathVariable("id") String id, @RequestParam("code") String code){
        try {
            userService.updateInstagramIdByUserId(id, code);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }
}
