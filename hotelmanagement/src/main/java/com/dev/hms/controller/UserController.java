package com.dev.hms.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dev.hms.exception.ResourceNotFoundException;
import com.dev.hms.model.User;
import com.dev.hms.payload.ApiResponse;
import com.dev.hms.payload.SignUpRequest;
import com.dev.hms.payload.UserIdentityAvailability;
import com.dev.hms.payload.UserProfile;
import com.dev.hms.payload.UserSummary;
import com.dev.hms.repository.UserRepository;
import com.dev.hms.security.CurrentUser;
import com.dev.hms.security.UserPrincipal;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/me")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		String role = "";
		for (GrantedAuthority grantedAuthority : currentUser.getAuthorities()) {
			role = grantedAuthority.getAuthority();
		}
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),
				role);
		return userSummary;
	}

	@GetMapping("/user/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		Boolean isAvailable = !userRepository.existsByUsername(username);
		return new UserIdentityAvailability(isAvailable);
	}

	@GetMapping("/users/{username}")
	public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

		UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(),
				user.getCreatedAt());
		return userProfile;
	}

	@GetMapping("/users/staff")
	public List<User> getStaffUsers() {
		return userRepository.findByRole("Staff");
	}

	@DeleteMapping("/users/staff/{userId}")
	public boolean deleteStaff(@PathVariable String userId) {
		userRepository.deleteById(userId);
		return true;
	}
	
	@GetMapping("/users/staff/{userId}")
	public UserSummary getStaffDetails(@PathVariable String userId) {
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			return new UserSummary(user.get().getId(), user.get().getUsername(), user.get().getName(), user.get().getRole());
		}
		return null;
	}

	@PutMapping("/user")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		Optional<User> user = userRepository.findByUsername(signUpRequest.getUsername());
		if (user.isPresent() && !user.get().getId().equals(signUpRequest.getId())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
		}
		Optional<User> olduserOptional = userRepository.findById(signUpRequest.getId());
		if(olduserOptional.isPresent()) {			
			User olduser = olduserOptional.get();
			olduser.setUsername(signUpRequest.getUsername());
			olduser.setName(signUpRequest.getName());
			User result = userRepository.save(olduser);
			return new ResponseEntity(new ApiResponse(true, "success"), HttpStatus.OK);
		}else {
			return new ResponseEntity(new ApiResponse(false, "Invalid Details"), HttpStatus.BAD_REQUEST);
		}
	}
}
