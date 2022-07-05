package com.dev.hms.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Guest {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("guestId")
	private String guestId;
	@JsonProperty("phoneNumber")
	private String phoneNumber;
	@JsonProperty("company")
	private String company;
	@JsonProperty("name")
	private String name;
	@JsonProperty("email")
	private String email;
	@JsonProperty("gender")
	private String gender;
	@JsonProperty("address")
	private String address;
	
	
}
