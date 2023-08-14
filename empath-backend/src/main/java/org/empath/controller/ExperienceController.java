package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.db.Experience;
import org.empath.model.dto.Response;
import org.empath.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_FAILURE;
import static org.empath.constant.CommonConstants.REST_SUCCESS;

@CrossOrigin
@RequestMapping("/v1/experience")
@RestController
public class ExperienceController {

    @Autowired
    ExperienceService experienceService;

    @GetMapping("/getAllExperiences")
    public ResponseEntity<Response> getAllExperiences(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, experienceService.getAllExperiences()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getAllUpcomingExperiences")
    public ResponseEntity<Response> getAllUpcomingExperiences(){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, experienceService.getAllUpcomingExperiences()));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getExperienceByExpId/{id}")
    public ResponseEntity<Response> getExperienceByExpId(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, experienceService.getExperienceByExpId(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getUserExperience/{id}")
    public ResponseEntity<Response> getYourExperience(@PathVariable("id") String id){
        try {
            return ResponseEntity.ok(new Response(REST_SUCCESS, experienceService.getYourExperiences(id)));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addExperience")
    public ResponseEntity<Response> addExperience(@RequestBody Experience experience){
        try {
            experienceService.addExperience(experience);
            return ResponseEntity.ok(new Response(REST_SUCCESS, null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/deleteExperienceByExpId/{id}")
    public ResponseEntity<Response> deleteExperienceByExpId(@PathVariable("id") String id){
        try {
            experienceService.deleteExperienceByExpId(id);
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
