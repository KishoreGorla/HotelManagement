package com.dev.hms.payload;

public class UserSummary {
    private String id;
    private String username;
    private String name;
    private String role;
    
    public UserSummary(String id, String username, String name, String role) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
    
}
