package com.dev.hms.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Bill {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("reservationId")
	private String reservationId;
	@JsonProperty("roomNum")
	private String roomNum;
	@JsonProperty("roomCost")
	private Double roomCost;
	@JsonProperty("taxes")
	private Double taxes;
	@JsonProperty("billingDate")
	private Date billingDate;
	@JsonProperty("services")
	private String services;
	@JsonProperty("servicesAmount")
	private Double servicesAmount;
	@JsonProperty("total")
	private Double total;
	@JsonProperty("status")
	private String status;

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

	public Double getTaxes() {
		return taxes;
	}

	public void setTaxes(Double taxes) {
		this.taxes = taxes;
	}

	public Date getBillingDate() {
		return billingDate;
	}

	public void setBillingDate(Date billingDate) {
		this.billingDate = billingDate;
	}

	public String getServices() {
		return services;
	}

	public void setServices(String services) {
		this.services = services;
	}

	public Double getServicesAmount() {
		return servicesAmount;
	}

	public void setServicesAmount(Double servicesAmount) {
		this.servicesAmount = servicesAmount;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReservationId() {
		return reservationId;
	}

	public void setReservationId(String reservationId) {
		this.reservationId = reservationId;
	}

	public Bill() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Bill(String _id, String reservationId, String roomNum, Double roomCost, Double taxes, Date billingDate,
			String services, Double servicesAmount, Double total, String status) {
		super();
		this._id = _id;
		this.reservationId = reservationId;
		this.roomNum = roomNum;
		this.roomCost = roomCost;
		this.taxes = taxes;
		this.billingDate = billingDate;
		this.services = services;
		this.servicesAmount = servicesAmount;
		this.total = total;
		this.status = status;
	}

}
