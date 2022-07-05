package com.dev.hms.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.hms.model.Reservation;

public interface ReservationRepository extends MongoRepository<Reservation,String> {

	List<Reservation> findByStatusNot(String string);

}
