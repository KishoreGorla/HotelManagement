package com.dev.hms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.hms.model.Guest;

public interface GuestRepository extends MongoRepository<Guest,String> {

}
