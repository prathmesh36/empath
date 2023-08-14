package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.db.Client;
import org.empath.model.dto.Response;
import org.empath.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_FAILURE;
import static org.empath.constant.CommonConstants.REST_SUCCESS;

@CrossOrigin
@RequestMapping("/v1/client")
@RestController
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("/getAllClients")
    public ResponseEntity<Response> getAllClients(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, clientService.getAllClients()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getClientByClientId/{id}")
    public ResponseEntity<Response> getClientByClientId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, clientService.getClientByClientId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addClient")
    public ResponseEntity<Response> addClient(@RequestBody Client client){
        try {
            clientService.addClient(client);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/deleteClientByClientId/{id}")
    public ResponseEntity<Response> deleteClientByClientId(@PathVariable("id") String id){
        try {
            clientService.deleteClientByClientId(id);
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
