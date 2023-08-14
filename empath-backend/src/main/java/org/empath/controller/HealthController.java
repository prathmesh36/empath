package org.empath.controller;

import org.empath.model.dto.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_SUCCESS;

@CrossOrigin
@RequestMapping("/v1/health")
@RestController
public class HealthController {
    @GetMapping("/checkHealth")
    public ResponseEntity<Response> checkHealth(){
        return ResponseEntity.ok(new Response(REST_SUCCESS, null));
    }
}
