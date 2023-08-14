package org.empath.model.dto.clientHistory;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ClientHistoryData {
    public String userName;
    public String timestamp;
}
