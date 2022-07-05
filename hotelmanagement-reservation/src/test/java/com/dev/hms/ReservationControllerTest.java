package com.dev.hms;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.dev.hms.model.Reservation;
import com.dev.hms.repository.ReservationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest
public class ReservationControllerTest {

	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	ReservationRepository reservationRepository;
	
	@Test
	public void testSaveReservationDetails() throws Exception {
		Reservation reservation = new Reservation();
		reservation.setAdults(1);
		reservation.setChildren(1);
		reservation.setNights(2);
		reservation.setRoomCost(1500d);
		reservation.setRoomNum("1202");
		Mockito.when(reservationRepository.save(Mockito.any())).thenReturn(reservation);
		String request = new ObjectMapper().writeValueAsString(reservation);
		mockMvc.perform(post("/api/reservation/").contentType(MediaType.APPLICATION_JSON).content(request)).andExpect(status().is2xxSuccessful());
	}
	
	@Test
	public void getReservationDetails() throws Exception {
		Reservation reservation = new Reservation();
		reservation.setAdults(1);
		reservation.setChildren(1);
		reservation.setNights(2);
		reservation.setRoomCost(1500d);
		reservation.setRoomNum("1202");
		Mockito.when(reservationRepository.findById(Mockito.anyString())).thenReturn(Optional.of(reservation));
		mockMvc.perform(get("/api/reservation/622c9a1605597d1b038715a8").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
		
	}
}
