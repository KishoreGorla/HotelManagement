package com.dev.hms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.hms.model.Reservation;

public interface ReservationRepository extends MongoRepository<Reservation,String> {

}
