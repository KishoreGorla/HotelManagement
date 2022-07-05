package com.dev.hms.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Reservation {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("roomNum")
	private String roomNum;
	@JsonProperty("roomCost")
	private Double roomCost;
	@JsonProperty("children")
	private int children;
	@JsonProperty("adults")
	private int adults;
	@JsonProperty("checkin")
	private String checkin;
	@JsonProperty("checkout")
	private String checkout;
	@JsonProperty("status")
	private String status;
	@JsonProperty("nights")
	private int nights;

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getRoomNum() {
		return roomNum;
	}

	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}

	public Double getRoomCost() {
		return roomCost;
	}

	public void setRoomCost(Double roomCost) {
		this.roomCost = roomCost;
	}

	public int getChildren() {
		return children;
	}

	public void setChildren(int children) {
		this.children = children;
	}

	public int getAdults() {
		return adults;
	}

	public void setAdults(int adults) {
		this.adults = adults;
	}

	public String getCheckin() {
		return checkin;
	}

	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}

	public String getCheckout() {
		return checkout;
	}

	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getNights() {
		return nights;
	}

	public void setNights(int nights) {
		this.nights = nights;
	}

	public Reservation(String _id, String roomNum, Double roomCost, int children, int adults, String checkin,
			String checkout, String status, int nights) {
		super();
		this._id = _id;
		this.roomNum = roomNum;
		this.roomCost = roomCost;
		this.children = children;
		this.adults = adults;
		this.checkin = checkin;
		this.checkout = checkout;
		this.status = status;
		this.nights = nights;
	}

	public Reservation() {
		super();
		// TODO Auto-generated constructor stub
	}

}
