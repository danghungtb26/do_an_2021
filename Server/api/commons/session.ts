import { ClientSession, startSession } from 'mongoose'

export const test = () => {}

// func chay cung voi session
export const runWithSession = async (
  process: (session: ClientSession, success: () => Promise<any>) => void,
  successcb?: any,
  errorcb?: (error: any) => void
) => {
  let session: ClientSession

  try {
    // khoi tai transaction
    session = await startSession({
      defaultTransactionOptions: {
        writeConcern: { w: 'majority' },
        readConcern: { level: 'snapshot' },
      },
    })

    await session.startTransaction({
      writeConcern: { w: 'majority' },
      readConcern: { level: 'snapshot' },
    })

    // func chay trong session
    // param bao gồm session và func commit session
    if (typeof process === 'function') {
      await process(session, async () => {
        await session.commitTransaction()
        if (session) session.endSession()
      })
    }
  } catch (error) {
    if (typeof errorcb === 'function') {
      errorcb(error)
    }
    await session.abortTransaction()
    if (session) session.endSession()
  } finally {
    // ket thuc tat ca se ket thuc session
    //
  }
}
