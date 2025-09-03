package org.comforent.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HousingType {
    HOUSE(1, "HOUSE"),
    APARTMENT(2, "APARTMENT"),
    ROOM_IN_APARTMENT(3, "ROOM_IN_APARTMENT"),
    ROOM_IN_HOUSE(4, "ROOM_IN_HOUSE"),
    BED_IN_HOSTEL(5,"BED_IN_HOSTEL");

    private final int id;
    private final String displayName;

    public static HousingType fromId(int id) {
        for (HousingType type : values()) {
            if (type.id == id) {
                return type;
            }
        }
        throw new IllegalArgumentException("Неизвестный id: " + id);
    }

    public static HousingType fromName(String name) {
        for (HousingType type : values()) {
            if (type.name().equalsIgnoreCase(name)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Неизвестное имя: " + name);
    }
}
