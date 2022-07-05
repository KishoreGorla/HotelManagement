package com.dev.hms;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.dev.hms.model.Bill;
import com.dev.hms.model.Reservation;
import com.dev.hms.repository.BillRepository;
import com.dev.hms.repository.PaymentsRepository;
import com.dev.hms.repository.ReservationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest
public class PaymentsControllerTest {

	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	BillRepository billRepository;
	
	@MockBean
	PaymentsRepository paymentsRepository;
	
	@MockBean
	ReservationRepository reservationRepository;
	
	@Test
	public void testSaveBillDetails() throws Exception {
		Bill bill = new Bill();
		bill.setBillingDate(new Date());
		bill.setReservationId("123456789000");
		bill.setRoomCost(2500d);
		bill.setRoomNum("1202");
		bill.setTaxes(500d);
		bill.setTotal(3000d);
		Mockito.when(billRepository.save(Mockito.any())).thenReturn(bill);
		String request = new ObjectMapper().writeValueAsString(bill);
		mockMvc.perform(post("/api/payments/issuebill").contentType(MediaType.APPLICATION_JSON).content(request)).andExpect(status().is2xxSuccessful());
	}
	
	@Test
	public void getBillDetails() throws Exception {
		Bill bill = new Bill();
		bill.setBillingDate(new Date());
		bill.setReservationId("123456789000");
		bill.setRoomCost(2500d);
		bill.setRoomNum("1202");
		bill.setTaxes(500d);
		bill.setTotal(3000d);
		Mockito.when(billRepository.findById(Mockito.anyString())).thenReturn(Optional.of(bill));
		mockMvc.perform(get("/api/payments/bill/622c9a1605597d1b038715a8").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
		
	}
}
