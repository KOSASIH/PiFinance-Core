// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CollateralManager {
    mapping(address => uint256) public collateralBalances;
    uint256 public totalCollateral;

    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);

    function depositCollateral(uint256 amount) external {
        collateralBalances[msg.sender] += amount;
        totalCollateral += amount;
        emit CollateralDeposited(msg.sender, amount);
    }

    function withdrawCollateral(uint256 amount) external {
        require(collateralBalances[msg.sender] >= amount, "Insufficient collateral");
        collateralBalances[msg.sender] -= amount;
        totalCollateral -= amount;
        emit CollateralWithdrawn(msg.sender, amount);
    }
}
