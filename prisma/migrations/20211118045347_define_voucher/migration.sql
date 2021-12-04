-- AlterTable
ALTER TABLE `Config` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Logs` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Vouchers` MODIFY `deletedAt` DATETIME(3) NULL;
