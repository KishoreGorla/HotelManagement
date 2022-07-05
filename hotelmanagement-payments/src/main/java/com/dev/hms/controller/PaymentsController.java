package com.dev.hms.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.hms.model.Bill;
import com.dev.hms.model.Payments;
import com.dev.hms.model.Reservation;
import com.dev.hms.repository.BillRepository;
import com.dev.hms.repository.PaymentsRepository;
import com.dev.hms.repository.ReservationRepository;

@RestController
@RequestMapping("/api/payments")
public class PaymentsController {
	
	@Autowired
	PaymentsRepository paymentsRepository;
	
	@Autowired
	BillRepository billRepository;
	
	@Autowired
	ReservationRepository reservationRepository;

	@PostMapping("/issuebill")
	public Bill issueBill(@RequestBody Bill bill) {
		return billRepository.save(bill);
	}

	@GetMapping("/bill/{id}")
	public Optional<Bill> issueBill(@PathVariable String id) {
		return billRepository.findById(id);
	}
	
	@PostMapping("/makepayment")
	public Payments makePayment(@RequestBody Payments payments) {
		Optional<Bill> billingOptional = billRepository.findById(payments.getBillingId());
		if(billingOptional.isPresent()) {
			Bill bill = billingOptional.get();
			bill.setStatus("PAID");
			billRepository.save(bill);
			Optional<Reservation> reserveOpt = reservationRepository.findById(bill.getReservationId());
			if(reserveOpt.isPresent()) {
				Reservation reservation = reserveOpt.get();
				reservation.setStatus("PAID");
				reservationRepository.save(reservation);
			}
		}
		return paymentsRepository.save(payments);
		
	}
}
