package be.ap.jwtsecurity;

import org.springframework.stereotype.Component;
import java.util.List;
import java.util.ArrayList;

import be.ap.jwtsecurity.model.User;
import be.ap.jwtsecurity.model.dto.RegisterUserDto;
import be.ap.jwtsecurity.repository.UserRepository;
import be.ap.jwtsecurity.services.AuthenticationService;
import jakarta.annotation.PostConstruct;

@Component
public class DataSeeder {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public DataSeeder(UserRepository userRepository, AuthenticationService authenticationService) {

        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
    }

    // Method to seed data, annotated with @PostConstruct to run after injection
    @PostConstruct
    public void seedData() {        
        if (userRepository.count() == 0) {
            User user = authenticationService.signup(new RegisterUserDto("test", "test", "Andie Similon"));
            user.setRole(("ROLE_ADMIN"));
          
            userRepository.save(user);
            
        }

    }
}