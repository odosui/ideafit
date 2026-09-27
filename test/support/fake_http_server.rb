require "socket"

# Answers one HTTP request on localhost with a canned response and keeps the raw request.
class FakeHttpServer
  def initialize(status: 200, body: "{}")
    @server = TCPServer.new("127.0.0.1", 0)
    @thread = Thread.new { serve("HTTP/1.1 #{status} Canned\r\nContent-Length: #{body.bytesize}\r\nConnection: close\r\n\r\n#{body}") }
  end

  def url
    "http://127.0.0.1:#{@server.addr[1]}"
  end

  def request
    @thread.value
  end

  def close
    @thread.kill
    @server.close
  end

  private

  def serve(response)
    socket = @server.accept
    head = socket.gets("\r\n\r\n")
    length = head[/^Content-Length: (\d+)/i, 1].to_i
    head + socket.read(length)
  ensure
    socket&.write(response)
    socket&.close
  end
end
