package com.dev.hms.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Payments {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("billingId")
	private String billingId;
	@JsonProperty("total")
	private Double total;
	@JsonProperty("paymentDate")
	private Date paymentDate;
	@JsonProperty("cardNumber")
	private String cardNumber;
	@JsonProperty("cardHolderName")
	private String cardHolderName;

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getBillingId() {
		return billingId;
	}

	public void setBillingId(String billingId) {
		this.billingId = billingId;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getCardHolderName() {
		return cardHolderName;
	}

	public void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}

	public Payments() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Payments(String _id, String billingId, Double total, Date paymentDate, String cardNumber,
			String cardHolderName) {
		super();
		this._id = _id;
		this.billingId = billingId;
		this.total = total;
		this.paymentDate = paymentDate;
		this.cardNumber = cardNumber;
		this.cardHolderName = cardHolderName;
	}

}
