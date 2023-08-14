package org.empath.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.uuid.Generators;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String getUUID(){
        return Generators.timeBasedGenerator().generate().toString();
    }

    public static <T> T fromJson(String json, Class<T> valueType) throws Exception {
        return objectMapper.readValue(json, valueType);
    }
}
