using System.Net;

namespace TheBookBazaar.Middleware
{
    public class StatusException : Exception
    {
        public HttpStatusCode Code { get; }
        public object Errors { get; }
        public StatusException(HttpStatusCode code, object error = null)
        {
            Code = code;
            Errors = error;
        }
    }
}
