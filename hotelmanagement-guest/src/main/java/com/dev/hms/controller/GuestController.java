package com.dev.hms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.hms.model.Guest;
import com.dev.hms.repository.GuestRepository;

@RestController
@RequestMapping("/api/guests")
public class GuestController {
	
	@Autowired
	GuestRepository guestRepository;

	@GetMapping("/all")
    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }
	
	@GetMapping("/{id}")
    public Optional<Guest> getGuestById(@PathVariable String id) {
        return guestRepository.findById(id);
    }

	@DeleteMapping("/{id}")
    public boolean deleteGuestById(@PathVariable String id) {
        guestRepository.deleteById(id);
        return true;
    }
	
	@PostMapping("/")
	public Guest saveGuest(@RequestBody Guest guest) {
		return guestRepository.save(guest);
	}
	
	@PutMapping("/")
	public Guest updateGuest(@RequestBody Guest guest) {
		return guestRepository.save(guest);
	}
}
