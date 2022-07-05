package com.dev.hms.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.hms.model.Payments;

public interface PaymentsRepository extends MongoRepository<Payments,String> {

}
