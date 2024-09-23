import Error "mo:base/Error";
import Func "mo:base/Func";

import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
    // Function to add two numbers
    public func add(x : Float, y : Float) : async Float {
        return x + y;
    };

    // Function to subtract two numbers
    public func subtract(x : Float, y : Float) : async Float {
        return x - y;
    };

    // Function to multiply two numbers
    public func multiply(x : Float, y : Float) : async Float {
        return x * y;
    };

    // Function to divide two numbers
    public func divide(x : Float, y : Float) : async ?Float {
        if (y == 0) {
            Debug.print("Error: Division by zero");
            return null;
        } else {
            return ?(x / y);
        };
    };
};
