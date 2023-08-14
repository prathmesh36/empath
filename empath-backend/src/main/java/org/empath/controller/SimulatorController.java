package org.empath.controller;

import org.empath.exception.EmpathException;
import org.empath.model.dto.instagram.InstagramCommentedUser;
import org.empath.model.dto.instagram.InstagramComments;
import org.empath.model.dto.instagram.InstagramMedias;
import org.empath.model.dto.Response;
import org.empath.service.PurchaseHistoryPointGenerationService;
import org.empath.service.SMInteractionPointGenerationService;
import org.empath.util.DummyDataGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.empath.constant.CommonConstants.REST_SUCCESS;
import static org.empath.util.DummyDataGeneratorUtil.*;

@CrossOrigin
@RequestMapping("/v1/simulator")
@RestController
public class SimulatorController {

    @Autowired
    PurchaseHistoryPointGenerationService purchaseHistoryPointGenerationService;

    @Autowired
    SMInteractionPointGenerationService smInteractionPointGenerationService;

    @GetMapping("/getClientHistory")
    public ResponseEntity<Response> getClientHistory() {
        try{
            return ResponseEntity.ok(new Response(REST_SUCCESS, DummyDataGeneratorUtil.getClientHistoryDummyData()));
        }catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/getInstagramMedias")
    public InstagramMedias getInstagramMedias(@RequestParam String accessToken){
        try {
            return getInstagramMediaDummyData();
        }catch (EmpathException e) {
            return new InstagramMedias();
        }
    }

    @GetMapping("/getInstagramComments/{id}")
    public InstagramComments getInstagramComments(@PathVariable("id") String id){
        try {
            return getInstagramCommentsDummyData();
        }catch (EmpathException e) {
            return new InstagramComments();
        }
    }

    @GetMapping("/getInstagramCommentedUser/{id}")
    public InstagramCommentedUser getInstagramCommentedUser(@PathVariable("id") String id){
        try {
            return getInstagramCommentedUserDummyData();
        }catch (EmpathException e) {
            return new InstagramCommentedUser();
        }
    }

    @GetMapping("/runSMInteractionPointGenerationProcess")
    public ResponseEntity<Response> runSMInteractionPointGenerationProcess(){
        try {
            smInteractionPointGenerationService.process();
            return ResponseEntity.ok(new Response(REST_SUCCESS,null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/runPurchaseHistoryPointGenerationProcess")
    public ResponseEntity<Response> runPurchaseHistoryPointGenerationProcess(){
        try {
            purchaseHistoryPointGenerationService.process();
            return ResponseEntity.ok(new Response(REST_SUCCESS,null));
        } catch (EmpathException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new Response(e.getErrorCode() + " - " + e.getMessage(), null)
            );
        }
    }
}
