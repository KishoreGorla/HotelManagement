package com.dev.hms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.hms.model.Bill;

public interface BillRepository extends MongoRepository<Bill,String> {

}
