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

import com.dev.hms.model.Reservation;
import com.dev.hms.repository.ReservationRepository;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
	
	@Autowired
	ReservationRepository reservationRepository;

	@GetMapping("/all")
    public List<Reservation> getAllReservetions() {
        return reservationRepository.findByStatusNot("PAID");
    }
	
	@GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable String id) {
        return reservationRepository.findById(id);
    }
	
	@PostMapping("/")
	public Reservation saveReservation(@RequestBody Reservation reservation) {
		return reservationRepository.save(reservation);
	}
	@PutMapping("/{id}")
	public Reservation updateReservation(@RequestBody Reservation reservation) {
	return reservationRepository.save(reservation);
	}
	@DeleteMapping("/{id}")
	public boolean deleteReservationById(@PathVariable String id) {
		reservationRepository.deleteById(id);
		return true;
	}

}