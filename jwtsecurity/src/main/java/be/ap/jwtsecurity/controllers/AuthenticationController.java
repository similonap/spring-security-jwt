package be.ap.jwtsecurity.controllers;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ap.jwtsecurity.model.User;
import be.ap.jwtsecurity.model.dto.LoginResponse;
import be.ap.jwtsecurity.model.dto.LoginUserDto;
import be.ap.jwtsecurity.model.dto.RegisterUserDto;
import be.ap.jwtsecurity.services.AuthenticationService;
import be.ap.jwtsecurity.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }


@GetMapping("user")
    public User account(@AuthenticationPrincipal User userDetails) {
        
        return userDetails;
    


        
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(HttpServletResponse response, @RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();

        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        Cookie authCookie = new Cookie("JWT_TOKEN", jwtToken);
        authCookie.setHttpOnly(true); 
        authCookie.setPath("/"); 
        response.addCookie(authCookie);

        return ResponseEntity.ok(loginResponse);
    }
}
