package org.comforent.validation;

public class ValidationPatterns {
    public static final String NAME_PATTERN = "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я]?[a-zа-я]+)*$";
    public static final String NAME_MESSAGE = "Name must start with a capital letter and contain only letters or hyphens (not at the start or end)";
}
